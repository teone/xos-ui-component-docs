cp -R ../xos/views/ngXosLib/docs/ .
cp ../xos/xos/core/xoslib/static/js/vendor/ngXosHelpers.js ./xos/core/xoslib/static/js/vendor/ngXosHelpers.js
cp ../xos/xos/core/static/xosNgLib.css  ./xos/core/static/xosNgLib.css

sed s%../xos/core/xoslib/static/js/vendor/ngXosHelpers.js%xos/core/xoslib/static/js/vendor/ngXosHelpers.js% <index.html >index.html
sed s%../xos/core/static/xosNgLib.css%xos/core/static/xosNgLib.css% <index.html >index.html

git status

git add .

git commit -m "updated docs"

git push origin gh-pages
