"use strict";
var interfacesDemo = function () {
    // Instead of the following...
    // function showTodo(todo: { title: string; text: string }) {
    //     console.log(todo.title + ': ' + todo.text);
    // }
    function showTodo(todo) {
        console.log(todo.title + ': ' + todo.text);
    }
    var myTodo = { title: 'Trash', text: 'Take out trash' };
    console.log('===== INTERFACES.JS OUTPUT =====');
    showTodo(myTodo);
};
interfacesDemo();
