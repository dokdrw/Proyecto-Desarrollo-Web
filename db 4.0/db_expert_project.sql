-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_expert_project
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_expert_project
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_expert_project` DEFAULT CHARACTER SET utf8 ;
USE `db_expert_project` ;

-- -----------------------------------------------------
-- Table `db_expert_project`.`tbl_plan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_expert_project`.`tbl_plan` (
  `codigo_plan` INT NOT NULL AUTO_INCREMENT,
  `nombre_plan` VARCHAR(45) NOT NULL,
  `descripcion_plan` VARCHAR(100) NULL,
  `cantidad_archivos` INT NOT NULL,
  PRIMARY KEY (`codigo_plan`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_expert_project`.`tbl_pais`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_expert_project`.`tbl_pais` (
  `codigo_pais` INT NOT NULL AUTO_INCREMENT,
  `nombre_pais` VARCHAR(90) NOT NULL,
  PRIMARY KEY (`codigo_pais`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_expert_project`.`tbl_tarjeta_credito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_expert_project`.`tbl_tarjeta_credito` (
  `codigo_tarjeta_credito` INT NOT NULL AUTO_INCREMENT,
  `numero_tarjeta` VARCHAR(16) NOT NULL,
  `fecha_expiracion` VARCHAR(5) NOT NULL,
  `cvv` VARCHAR(4) NOT NULL,
  `ciudad_o_estado` VARCHAR(45) NOT NULL,
  `codigo_postal` VARCHAR(15) NOT NULL,
  `codigo_pais` INT NOT NULL,
  PRIMARY KEY (`codigo_tarjeta_credito`),
  CONSTRAINT `fk_tbl_tarjeta_credito_tbl_pais1`
    FOREIGN KEY (`codigo_pais`)
    REFERENCES `db_expert_project`.`tbl_pais` (`codigo_pais`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_expert_project`.`tbl_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_expert_project`.`tbl_usuario` (
  `codigo_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre_usuario` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(45) NOT NULL,
  `facebook` VARCHAR(45) NULL,
  `contrasena` VARCHAR(90) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `url_imagen` VARCHAR(350) NULL DEFAULT 'img/profile-pics/profile.jpg',
  `codigo_plan` INT NOT NULL,
  `codigo_tarjeta_credito` INT NULL,
  PRIMARY KEY (`codigo_usuario`),
  CONSTRAINT `fk_tbl_usuario_tbl_plan`
    FOREIGN KEY (`codigo_plan`)
    REFERENCES `db_expert_project`.`tbl_plan` (`codigo_plan`),
  CONSTRAINT `fk_tbl_usuario_tbl_tarjeta_credito1`
    FOREIGN KEY (`codigo_tarjeta_credito`)
    REFERENCES `db_expert_project`.`tbl_tarjeta_credito` (`codigo_tarjeta_credito`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_expert_project`.`tbl_tipo_archivo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_expert_project`.`tbl_tipo_archivo` (
  `codigo_tipo_archivo` INT NOT NULL AUTO_INCREMENT,
  `tipo_archivo` VARCHAR(25) NOT NULL,
  `descripcion_archivo` VARCHAR(100) NULL,
  PRIMARY KEY (`codigo_tipo_archivo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_expert_project`.`tbl_carpeta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_expert_project`.`tbl_carpeta` (
  `codigo_carpeta` INT NOT NULL AUTO_INCREMENT,
  `nombre_carpeta` VARCHAR(45) NOT NULL,
  `descripcion_carpeta` VARCHAR(45) NULL,
  `fecha_creacion` DATETIME NOT NULL,
  `ultima_modificacion` DATETIME NOT NULL,
  `codigo_usuario` INT NOT NULL,
  `codigo_carpeta_padre` INT NULL,
  PRIMARY KEY (`codigo_carpeta`),
  CONSTRAINT `fk_tbl_carpeta_tbl_usuario1`
    FOREIGN KEY (`codigo_usuario`)
    REFERENCES `db_expert_project`.`tbl_usuario` (`codigo_usuario`),
  CONSTRAINT `fk_tbl_carpeta_tbl_carpeta1`
    FOREIGN KEY (`codigo_carpeta_padre`)
    REFERENCES `db_expert_project`.`tbl_carpeta` (`codigo_carpeta`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_expert_project`.`tbl_chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_expert_project`.`tbl_chat` (
  `codigo_chat` INT NOT NULL,
  `fecha_creacion` DATETIME NOT NULL,
  PRIMARY KEY (`codigo_chat`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_expert_project`.`tbl_archivo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_expert_project`.`tbl_archivo` (
  `codigo_archivo` INT NOT NULL AUTO_INCREMENT,
  `nombre_archivo` VARCHAR(45) NOT NULL,
  `descripcion_archivo` VARCHAR(100) NULL,
  `contenido_archivo` VARCHAR(10000) NOT NULL,
  `fecha_publicacion` DATETIME NOT NULL,
  `ultima_modificacion` DATETIME NOT NULL,
  `codigo_usuario` INT NOT NULL,
  `codigo_carpeta` INT NULL,
  `codigo_tipo_archivo` INT NOT NULL,
  `codigo_chat` INT NULL,
  PRIMARY KEY (`codigo_archivo`),
  CONSTRAINT `fk_tbl_archivo_tbl_usuario1`
    FOREIGN KEY (`codigo_usuario`)
    REFERENCES `db_expert_project`.`tbl_usuario` (`codigo_usuario`),
  CONSTRAINT `fk_tbl_archivo_tbl_carpeta1`
    FOREIGN KEY (`codigo_carpeta`)
    REFERENCES `db_expert_project`.`tbl_carpeta` (`codigo_carpeta`),
  CONSTRAINT `fk_tbl_archivo_tbl_tipo_archivo1`
    FOREIGN KEY (`codigo_tipo_archivo`)
    REFERENCES `db_expert_project`.`tbl_tipo_archivo` (`codigo_tipo_archivo`),
  CONSTRAINT `fk_tbl_archivo_tbl_chat1`
    FOREIGN KEY (`codigo_chat`)
    REFERENCES `db_expert_project`.`tbl_chat` (`codigo_chat`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_expert_project`.`tbl_usu_x_cap_compartida`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_expert_project`.`tbl_usu_x_cap_compartida` (
  `codigo_usuario_beneficiado` INT NOT NULL,
  `codigo_carpeta` INT NOT NULL,
  CONSTRAINT `fk_tbl_usu_x_cap_compartida_tbl_usuario1`
    FOREIGN KEY (`codigo_usuario_beneficiado`)
    REFERENCES `db_expert_project`.`tbl_usuario` (`codigo_usuario`),
  CONSTRAINT `fk_tbl_usu_x_cap_compartida_tbl_carpeta1`
    FOREIGN KEY (`codigo_carpeta`)
    REFERENCES `db_expert_project`.`tbl_carpeta` (`codigo_carpeta`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_expert_project`.`tbl_usu_x_arch_compartido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_expert_project`.`tbl_usu_x_arch_compartido` (
  `codigo_usuario_beneficiado` INT NOT NULL,
  `codigo_archivo` INT NOT NULL,
  CONSTRAINT `fk_tbl_usu_x_arch_compartido_tbl_usuario1`
    FOREIGN KEY (`codigo_usuario_beneficiado`)
    REFERENCES `db_expert_project`.`tbl_usuario` (`codigo_usuario`),
  CONSTRAINT `fk_tbl_usu_x_arch_compartido_tbl_archivo1`
    FOREIGN KEY (`codigo_archivo`)
    REFERENCES `db_expert_project`.`tbl_archivo` (`codigo_archivo`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_expert_project`.`tbl_comentario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_expert_project`.`tbl_comentario` (
  `codigo_comentario` INT NOT NULL,
  `comentario` VARCHAR(500) NOT NULL,
  `publicacion` DATETIME NOT NULL,
  `codigo_chat` INT NOT NULL,
  `codigo_usuario` INT NOT NULL,
  PRIMARY KEY (`codigo_comentario`),
  CONSTRAINT `fk_tbl_comentario_tbl_chat1`
    FOREIGN KEY (`codigo_chat`)
    REFERENCES `db_expert_project`.`tbl_chat` (`codigo_chat`),
  CONSTRAINT `fk_tbl_comentario_tbl_usuario1`
    FOREIGN KEY (`codigo_usuario`)
    REFERENCES `db_expert_project`.`tbl_usuario` (`codigo_usuario`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_expert_project`.`tbl_usuario_x_chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_expert_project`.`tbl_usuario_x_chat` (
  `codigo_usuario` INT NOT NULL,
  `codigo_chat` INT NOT NULL,
  CONSTRAINT `fk_tbl_usuario_x_chat_tbl_usuario1`
    FOREIGN KEY (`codigo_usuario`)
    REFERENCES `db_expert_project`.`tbl_usuario` (`codigo_usuario`),
  CONSTRAINT `fk_tbl_usuario_x_chat_tbl_chat1`
    FOREIGN KEY (`codigo_chat`)
    REFERENCES `db_expert_project`.`tbl_chat` (`codigo_chat`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_expert_project`.`tbl_amigos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_expert_project`.`tbl_amigos` (
  `codigo_usuario` INT NOT NULL,
  `codigo_usuario_amigo` INT NOT NULL,
  CONSTRAINT `fk_tbl_amigos_tbl_usuario1`
    FOREIGN KEY (`codigo_usuario`)
    REFERENCES `db_expert_project`.`tbl_usuario` (`codigo_usuario`),
  CONSTRAINT `fk_tbl_amigos_tbl_usuario2`
    FOREIGN KEY (`codigo_usuario_amigo`)
    REFERENCES `db_expert_project`.`tbl_usuario` (`codigo_usuario`)
)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
