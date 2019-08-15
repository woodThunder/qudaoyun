src目录下的文件需要用node进行编译，具体步骤如下

 - 安装node
 - npm install babel-cli -g
 - 进入src目录
 - npm install babel-preset-react
 - npm install babel-preset-es2015
 - babel *.js --presets=2015,react --out-dir ../
