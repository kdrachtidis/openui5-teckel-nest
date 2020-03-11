# Teckel Dashboard

![https://kdrachtidis.github.io/bootstrap-teckel-tutorial/](https://kdrachtidis.github.io/bootstrap-teckel-tutorial/img/Teckel-Default@1x.png "Teckel")

Repository for the dashboard for analyzing data created by our [user research tracking tool for behavioral analysis](https://github.com/SAP/ux-tracking-tool) (Teckel).<br />
This particular dashboard is based on test data from [this](https://kdrachtidis.github.io/openui5-teckel-master-detail/) prototype - Test it!

## How to use it!
### 1. Install local webserver (if you already have one you can skip this step)
1. As one possibility we suggest to install XAMPP with an free instance of Apache from [this](https://www.apachefriends.org/de/download.html) page. You will just need Apache and no other features of XAMPP.
2. Open the XAMPP Control Panel and start Apache. (There might be issues with skype using the same port. If to please follow the steps specified [here](https://stackoverflow.com/questions/11294812/how-to-change-xampp-apache-server-port) to solve this problem.)
3. Open your favorit browser and type in `http://localhost:80` or `http://localhost:8080` if you changed to port. If you can see a page your webserver is all set up.

### 2. Clone this repository to your system or download zip-file
1. Open our [repository](https://github.com/kdrachtidis/openui5-teckel-nest/).
2. Either clone the repository to your system or if you do not have installed git download the zip-file containing the java project and unzip it.
3. Place the unziped folder into `\XAMPP\htdocs`.
4. Open your favorit browser and type in `http://localhost:80/Teckel-Dashboard`. Now you should be able to see the Teckel Dashboard.

### 3. Use it for your prototype
1. For using the dashboard for your prototype you just have to exchange the files contained in the `\model` subfolder of the Teckel-Dashboard folder. Therefor delete all files that are currently contained in that folder and put your `UseCaseData.json` file and all other [parsed](https://github.wdf.sap.corp/teckel/Teckel-Parser) files into that folder.
2. If you now refresh your browser window you should see the Teckel-Dashboard containing your data.

