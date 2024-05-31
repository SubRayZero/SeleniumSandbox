const { Builder, By, Key, until } = require("selenium-webdriver");
require('dotenv').config();

async function testValidLogin() {
    let driver = await new Builder().forBrowser("firefox").build();

    try {
        if (!process.env.EMAIL || !process.env.PASSWORD) {
            throw new Error("Les variables d'environnement EMAIL et PASSWORD doivent être définies.");
        }

        await driver.get("https://simplonline.co/login");

        let emailField = await driver.wait(until.elementLocated(By.name("email")), 10000);
        await emailField.sendKeys(process.env.EMAIL);

        let passwordField = await driver.wait(until.elementLocated(By.name("password")), 10000);
        await passwordField.sendKeys(process.env.PASSWORD, Key.RETURN);

        await driver.wait(until.elementLocated(By.className('profile-username')), 10000);

        console.log("Connexion réussie avec les identifiants valides !");

    } catch (e) {
        console.error("Une erreur est survenue :", e);

    } finally {
        await driver.quit();
    }
}

testValidLogin();
