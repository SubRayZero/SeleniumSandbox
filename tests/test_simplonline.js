const { Builder, By, Key, until } = require("selenium-webdriver");


async function testInvalidLogin() {
    let driver = await new Builder().forBrowser("firefox").build();

    try {
        await driver.get("https://simplonline.co/");

        await driver.findElement(By.id("react-aria6231197280-1")).sendKeys("utilisateur_errone", Key.TAB);
        await driver.findElement(By.id("react-aria6231197280-5")).sendKeys("mdp_errone", Key.RETURN);

        await driver.wait(until.elementLocated(By.className("alert-danger")), 10000);

        console.log("Test de login avec identifiants erronés réussi !");

    } catch (e) {
        console.error("Une erreur est survenue :", e);

    } finally {
        await driver.quit();
    }
}

testInvalidLogin();

