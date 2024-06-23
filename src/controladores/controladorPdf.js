import conexion from '../servicios/basedatos.js'
import puppeteer from 'puppeteer'
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generarPdf = (req, res) => {
    try {
        let consultaComidas = "SELECT nombreComida, precioComida, descripcionComida, imgComida FROM comidas";
        let consultaBebidas = "SELECT nombreBebida, precioBebida, descripcionBebida, imgBebida FROM bebidas";

      
        conexion.query(consultaComidas, (errorComidas, resultComidas) => {
            if (errorComidas) {
                console.log(errorComidas);
                res.status(500).send("Error obteniendo datos de comidas de la base de datos");
                return;
            }
          
            conexion.query(consultaBebidas, (errorBebidas, resultBebidas) => {
                if (errorBebidas) {
                    console.log(errorBebidas);
                    res.status(500).send("Error obteniendo datos de bebidas de la base de datos");
                    return;
                }

                //genera contenido del menu
                let comidasHTML = resultComidas.map(c => `
                    <div class="menu-item">
                        <img src="${c.imgComida}" alt="${c.nombreComida}">
                        <div>
                            <h3>${c.nombreComida}</h3>
                            <p>${c.descripcionComida}</p>
                            <p class="precio">$${c.precioComida}</p>
                        </div>
                    </div>
                `).join('');

                // Generar el contenido dinámico para bebidas
                let bebidasHTML = resultBebidas.map(b => `
                    <div class="menu-item">
                        <img src="${b.imgBebida}" alt="${b.nombreBebida}">
                        <div>
                            <h3>${b.nombreBebida}</h3>
                            <p>${b.descripcionBebida}</p>
                            <p class="precio">$${b.precioBebida}</p>
                        </div>
                    </div>
                `).join('');

                // Leer el archivo HTML
                let menu = fs.readFileSync(path.join(__dirname, '../public/menu.html'), 'utf-8');

                // Leer el archivo CSS y agregarlo al HTML
                let css = fs.readFileSync(path.join(__dirname, '../public/menu.css'), 'utf-8');
                menu = `<style>${css}</style>` + menu;

                // Reemplazar los marcadores en el HTML con el contenido dinámico generado
                menu = menu.replace("{{comidas}}", comidasHTML);
                menu = menu.replace("{{bebidas}}", bebidasHTML);

                // Generar el PDF usando Puppeteer
                puppeteer.launch({ headless: true }).then(async browser => {
                    const page = await browser.newPage();
                    await page.setContent(menu, { waitUntil: 'load' });
                    const pdfBuffer = await page.pdf({
                        format: 'A4',
                        printBackground: true 
                    });
                    await browser.close();

                    // Configurar las cabeceras y enviar el PDF
                    res.setHeader('Content-disposition', 'attachment; filename="menu.pdf"');
                    res.setHeader('Content-type', 'application/pdf');
                    res.send(pdfBuffer);
                }).catch(error => {
                    console.error('Error generando el PDF:', error);
                    res.status(500).send('Error generando el PDF');
                });
            });
        });
    } catch (error) {
        console.error('Error generando el PDF:', error);
        res.status(500).send('Error generando el PDF');
    }
}

export default { generarPdf };

