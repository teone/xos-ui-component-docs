cp -R ../xos/views/ngXosLib/docs/ .
cp ../xos/xos/core/xoslib/static/js/vendor/ngXosHelpers.js ./xos/core/xoslib/static/js/vendor/ngXosHelpers.js

git status

git add .

git commit -m "updated docs"

git push origin gh-pages
