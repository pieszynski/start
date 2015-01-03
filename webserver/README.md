####WebServer na podstawie gałęzi nodeexpress+webbase

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
