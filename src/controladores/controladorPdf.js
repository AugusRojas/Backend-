import conexion from '../servicios/basedatos.js'
import puppeteer from 'puppeteer'
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generarPdf = async (req, res) => {
    try {
        console.log('Iniciando generación del PDF');

        // Consultas a la base de datos
        let consultaComidas = "SELECT nombreComida, precioComida, descripcionComida, imgComida FROM comidas";
        let consultaBebidas = "SELECT nombreBebida, precioBebida, descripcionBebida, imgBebida FROM bebidas";

        // Promisify para usar async/await con mysql
        const query = (sql) => {
            return new Promise((resolve, reject) => {
                conexion.query(sql, (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                });
            });
        };

        console.log('Obteniendo datos de comidas y bebidas');

        // Obtener datos de la base de datos
        const resultComidas = await query(consultaComidas);
        const resultBebidas = await query(consultaBebidas);

        console.log('Datos obtenidos de la base de datos');

        // Generar contenido HTML
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

        console.log('Generando contenido HTML');

        // Leer y preparar el archivo HTML
        let menu = fs.readFileSync(path.join(__dirname, '../Public/menu.html'), 'utf-8');

        // Leer y agregar el archivo CSS
        let css = fs.readFileSync(path.join(__dirname, '../Public/menu.css'), 'utf-8');
        menu = `<style>${css}</style>` + menu;

        // Reemplazar los marcadores en el HTML con el contenido dinámico generado
        menu = menu.replace("{{comidas}}", comidasHTML);
        menu = menu.replace("{{bebidas}}", bebidasHTML);

        console.log('HTML final generado');

        // Generar el PDF usando Puppeteer
        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'], timeout: 60000 });
        const page = await browser.newPage();

        console.log('Navegador Puppeteer lanzado');

        await page.setContent(menu, { waitUntil: 'networkidle0', timeout: 120000 }); // Aumentar el tiempo de espera a 120 segundos

        console.log('Contenido HTML cargado en Puppeteer');

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true // Incluir los fondos en el PDF
        });

        await browser.close();

        console.log('PDF generado y navegador cerrado');

        // Configurar las cabeceras y enviar el PDF
        res.setHeader('Content-disposition', 'attachment; filename="menu.pdf"');
        res.setHeader('Content-type', 'application/pdf');
        res.send(pdfBuffer);

    } catch (error) {
        console.error('Error generando el PDF:', error);
        res.status(500).send('Error generando el PDF');
    }
};

export default { generarPdf };