const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

async function testGitHubLogin() {
    let driver = await new Builder().forBrowser("firefox").build();

    try {
        await driver.manage().window().setRect({ width: 375, height: 812 });

        await driver.get("https://github.com");

        await driver.findElement(By.linkText("Sign in")).click();

        const loginPageTitle = await driver.getTitle();
        console.log("Titre de la page de connexion :", loginPageTitle);

        assert.strictEqual(loginPageTitle, "Sign in to GitHub · GitHub");

        await driver.findElement(By.css("#login_field")).sendKeys("votre_nom_d_utilisateur");
        await driver.findElement(By.css("#password")).sendKeys("votre_mot_de_passe_erroné", Key.ENTER);

        const errorMessage = await driver.findElement(By.css(".flash-error")).getText();
        console.log("Message d'erreur :", errorMessage);

        assert.strictEqual(errorMessage, "Incorrect username or password.");

        console.log("Test réussi !");

    } catch (e) {
        console.error("Une erreur est survenue :", e);

    } finally {
        await driver.quit();
    }
}

testGitHubLogin();
