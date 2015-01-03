(function (document) {

    function onDeviceReady() {

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

    document.addEventListener('deviceready', onDeviceReady, false);

})(document);
