const { Builder, By, Key, until } = require("selenium-webdriver");

async function testInvalidLogin() {
    let driver = await new Builder().forBrowser("firefox").build();

    try {
        await driver.get("https://simplonline.co/login");

        let emailField = await driver.wait(until.elementLocated(By.name("email")), 10000);
        await emailField.sendKeys("exemple@email.com", Key.TAB);

        let passwordField = await driver.wait(until.elementLocated(By.name("password")), 10000);
        await passwordField.sendKeys("mdp_errone", Key.RETURN);

        await driver.wait(until.elementLocated(By.className("alert-danger")), 10000);

        console.log("Test de login avec identifiants erronés réussi !");

    } catch (e) {
        console.error("Une erreur est survenue :", e);

    } finally {
        await driver.quit();
    }
}

testInvalidLogin();
