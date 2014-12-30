start
=====

Repozytorium kodu, od którego można zacząć projekt.

##Gałąź: nodeexpress
Ta gałąź zawiera prosty WebServer działający w oparciu o NodeJs oraz ExpressJs. Serwer automatycznie serwuje pliki statyczne oraz ma przygotowaną wstępną strukturę pod konfigurację REST-owego API
```bash
> git checkout nodeexpress
> npm install
> node app.js
```
##Gałąź: webbase
Szablon startowy dla projektów HTML+LESS+JavaScript. Cały projekt opiera się na prostym serwerze www stworzonym w gałęzi ```nodeexpress```. Tym razem jednak został on rozszerzony o funkcjonalności dostarczane przez GRUNT-a.

Dodatkowo zakładam, że na stacji są zainstalowane moduły
```bash
> npm install -g grunt-cli
> npm install -g less
```

Wszystko w tym module opiera się o zadania GRUNT-a a tworzony kod HTML jest rozwijany w pliku ```index.src.html```!

Aby zacząć standardowo odzyskujemy pakiety za pomocą npm-a oraz

* Najwygodniejszy sposób rozwijania strony to skorzystanie z polecenia ``` > grunt devwatch``` gdzie w tle działa już serwer www pod adresem http://localhost:1337/ oraz jeśli zostanie zmieniony źródłowy plik JavaScript/LESS/HTML to GRUNT przekompiluje zmienione pliki.
* Polecenie ``` > grunt devel``` uruchamia kompilację nie powodującą minimalizacji plików JavaScript/HTML przez co łatwiej będzie analizować błędy.
* Polecenie ``` > grunt release``` tworzy wersję produkcyjną minimalizując pliki wynikowe LESS, JavaScript oraz HTML.
