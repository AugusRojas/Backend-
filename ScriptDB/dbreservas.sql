-- MySQL Script generated by MySQL Workbench
-- vie 07 jun 2024 15:13:49
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ReservacionesBar
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ReservacionesBar
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ReservacionesBar` ;
USE `ReservacionesBar` ;

-- -----------------------------------------------------
-- Table `ReservacionesBar`.`sectores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ReservacionesBar`.`sectores` (
  `idsectores` INT NOT NULL AUTO_INCREMENT,
  `nombre_sector` VARCHAR(45) NULL,
  PRIMARY KEY (`idsectores`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ReservacionesBar`.`bebidas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ReservacionesBar`.`bebidas` (
  `idbebidas` INT NOT NULL AUTO_INCREMENT,
  `clasificacion_bebidas` VARCHAR(45) NULL,
  PRIMARY KEY (`idbebidas`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ReservacionesBar`.`comidas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ReservacionesBar`.`comidas` (
  `idcomidas` INT NOT NULL AUTO_INCREMENT,
  `nombre_comidas` VARCHAR(45) NULL,
  `descripcion_comidas` VARCHAR(45) NULL,
  PRIMARY KEY (`idcomidas`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ReservacionesBar`.`carta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ReservacionesBar`.`carta` (
  `idmenus` INT NOT NULL AUTO_INCREMENT,
  `nombre_menu` VARCHAR(45) NULL,
  `descripcion_menus` VARCHAR(45) NULL,
  `bebidas_idbebidas` INT NOT NULL,
  `comidas_idcomidas` INT NOT NULL,
  PRIMARY KEY (`idmenus`),
  INDEX `fk_menus_bebidas1_idx` (`bebidas_idbebidas` ASC) VISIBLE,
  INDEX `fk_menus_comidas1_idx` (`comidas_idcomidas` ASC) VISIBLE,
  CONSTRAINT `fk_menus_bebidas1`
    FOREIGN KEY (`bebidas_idbebidas`)
    REFERENCES `ReservacionesBar`.`bebidas` (`idbebidas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_menus_comidas1`
    FOREIGN KEY (`comidas_idcomidas`)
    REFERENCES `ReservacionesBar`.`comidas` (`idcomidas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ReservacionesBar`.`reservaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ReservacionesBar`.`reservaciones` (
  `idreservaciones` INT NOT NULL AUTO_INCREMENT,
  `nombre_reservaciones` VARCHAR(45) NULL,
  `apellido_reservaciones` VARCHAR(45) NULL,
  `mail_reservaciones` VARCHAR(250) NULL,
  `telefono_reservaciones` INT NULL,
  `fecha_reservaciones` DATE NULL,
  `hora_reservaciones` VARCHAR(45) NULL,
  `cantidad_reservaciones` INT NULL,
  `idmesas` INT NULL,
  `carta_idmenus` INT NOT NULL,
  PRIMARY KEY (`idreservaciones`),
  INDEX `fk_reservaciones_carta1_idx` (`carta_idmenus` ASC) VISIBLE,
  CONSTRAINT `fk_reservaciones_carta1`
    FOREIGN KEY (`carta_idmenus`)
    REFERENCES `ReservacionesBar`.`carta` (`idmenus`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ReservacionesBar`.`mesas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ReservacionesBar`.`mesas` (
  `idmesas` INT NOT NULL AUTO_INCREMENT,
  `cantidad_mesas` INT NULL,
  `estado_mesas` TINYINT NULL,
  `sectores_idsectores` INT NOT NULL,
  `idreservaciones` INT NOT NULL,
  INDEX `fk_mesas_sectores1_idx` (`sectores_idsectores` ASC) VISIBLE,
  PRIMARY KEY (`idmesas`),
  INDEX `fk_mesas_1_idx` (`idreservaciones` ASC) VISIBLE,
  CONSTRAINT `fk_mesas_sectores1`
    FOREIGN KEY (`sectores_idsectores`)
    REFERENCES `ReservacionesBar`.`sectores` (`idsectores`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mesas_1`
    FOREIGN KEY (`idreservaciones`)
    REFERENCES `ReservacionesBar`.`reservaciones` (`idreservaciones`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ReservacionesBar`.`mozos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ReservacionesBar`.`mozos` (
  `idmozos` INT NOT NULL AUTO_INCREMENT,
  `nombre_mozos` VARCHAR(45) NULL,
  `apellido_mozos` VARCHAR(45) NULL,
  `telefono_mozos` INT NULL,
  `mail_mozos` VARCHAR(100) NULL,
  `idsectores` INT NOT NULL,
  PRIMARY KEY (`idmozos`),
  INDEX `fk_mozos_sectores1_idx` (`idsectores` ASC) VISIBLE,
  CONSTRAINT `fk_mozos_sectores1`
    FOREIGN KEY (`idsectores`)
    REFERENCES `ReservacionesBar`.`sectores` (`idsectores`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
