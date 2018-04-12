
//grunt对象，要传进来
module.exports = function(grunt) {

    // 初始化配置（插件），每个插件的最后一个单词，就是插件对象名称
    grunt.initConfig({
        //用于合并 js
        concat: {
            options: {
                separator: ';',     // 表达式之间的代码，用分号分隔
            },
            dist: {     //任意名称
                src: ['src/js/*.js'],   //源文件路径
                dest: 'dist/js/built.js',   //指定合并后的文件名 和 存放的目录
            },
        },

        //用于压缩合并后的 js
        uglify: {
            xxx: {  //任意名称
                files: {
                    //压缩后的文件名和目录，要压缩的文件位置
                    'dist/js/built.min.js': ['dist/js/built.js']
                }
            }
        },

        // 合并压缩CSS
        cssmin: {
            target: {   //任意名称
                files: {
                    'dist/css/built.min.css': ['src/css/*.css']
                }
            }
        },

        //jshint语法检查，这个
        jshint: {
            options: {
                /*
                * 是否允许省略分号(allow semicolon)
                * 注意，一个配置选项，只能检测一种语法，其他的语法无法检测！
                * */
                "asi": true,
            },
            all: ['Gruntfile.js', 'src/js/*.js']
        },

        /*
        * 监视源文件变化, 自动重新打包
        * 当源文件发生变化，自动执行对应的插件任务
        * */
        watch: {
            scripts: {
                files: ['src/js/*.js', 'src/css/*.css'],
                tasks: ['jshint', 'concat', 'uglify', 'cssmin'],
            },
        }

    });

    // 加载包含各个插件任务
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    /*
    *注册待执行的，构建任务
    * 默认被执行的任务列表。使用 grunt命令默认执行的任务。
    * jshint一般会放在第一个执行，因为最重要了。
    * */
    grunt.registerTask('default', ['jshint','concat','uglify','cssmin']);

    /*
    * 这里不要混淆，第一个 watch只是名字（可以换成任意的），
    * default之后的 watch，是因为监视任务，要放在任务最后，
    * 原因：如果default任务中的任务都执行过一遍，则无所谓先后，
    *       如果没有执行过一遍，则只有当源文件进行修改时，才会生成对应任务执行后的文件，
    *       其他的都没有。
    * */
    grunt.registerTask('watch', ['default','watch']);

};