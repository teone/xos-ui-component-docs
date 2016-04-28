cp -R ../xos/views/ngXosLib/docs/ .
cp ../xos/xos/core/xoslib/static/js/vendor/ngXosHelpers.js ./xos/core/xoslib/static/js/vendor/ngXosHelpers.js
cp ../xos/xos/core/static/xosNgLib.css  ./xos/core/static/xosNgLib.css

sed -i '' 's%\.\./xos/core/xoslib/static/js/vendor/ngXosHelpers.js%xos/core/xoslib/static/js/vendor/ngXosHelpers.js%g' index.html
sed -i '' 's%../xos/core/static/xosNgLib.css%xos/core/static/xosNgLib.css%g' index.html

git status

git add .

git commit -m "updated docs"

git push origin gh-pages
