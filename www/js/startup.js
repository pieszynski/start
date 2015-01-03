(function (document) {

    function onDeviceReady() {

        document.addEventListener('pause', onPause, false);
        document.addEventListener('backbutton', onBack, false);
        document.addEventListener('menubutton', onMenu, false);

        // dodanie css
        var vendorCss = document.createElement('link');
        vendorCss.rel = 'stylesheet';
        vendorCss.type = 'text/css';
        vendorCss.href = 'css/vendor/vendor.min.css';
        document.head.appendChild(vendorCss);

        // dodanie skryptu
        var indexJs = document.createElement('script');
        indexJs.type = 'text/javascript';
        indexJs.src = 'js/index.min.js';
        document.head.appendChild(indexJs);
    }

    function onPause() {}

    function onBack() {

        navigator.app.exitApp();
    }

    function onMenu() {}

    document.addEventListener('deviceready', onDeviceReady, false);

})(document);
