#!/bin/bash
if [ -d "tmpghdeploy" ] ; then
  rm -rf tmpghdeploy
fi

if [ -d "build" ] ; then
  rm -rf build
fi

echo "Building site ..."
npm run build &> /dev/null


mkdir tmpghdeploy
cd tmpghdeploy

echo "Cloning gh-pages branch ..."
git clone --branch gh-pages https://github.com/pranabdas/sg-tax-calculator
cd ..
rsync -azh --exclude .git --delete build/ tmpghdeploy/sg-tax-calculator
cd tmpghdeploy/sg-tax-calculator
find . -type f -name \*.DS_Store -delete &> /dev/null
git add --all && git commit --amend --no-edit &> /dev/null
git push origin gh-pages --force &> /dev/null
echo "Deployed."
cd ../..
rm -rf tmpghdeploy
