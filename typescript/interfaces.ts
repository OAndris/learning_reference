const interfacesDemo = () => {
    // Instead of the following...
    // function showTodo(todo: { title: string; text: string }) {
    //     console.log(todo.title + ': ' + todo.text);
    // }

    // ... we can use interfaces like this (i.e. defining and then using a custom type):
    interface Todo {
        title: string;
        text: string;
    }

    function showTodo(todo: Todo) {
        console.log(todo.title + ': ' + todo.text);
    }

    let myTodo = { title: 'Trash', text: 'Take out trash' };

    console.log('===== INTERFACES.JS OUTPUT =====');
    showTodo(myTodo);
};

interfacesDemo();
