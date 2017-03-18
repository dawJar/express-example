// $(document).ready(function () {
//
//     $('form#add-todo').on('submit', function (event) {
//
//         event.preventDefault();
//         var todoInput = $('form#add-todo input');
//         var newTodo = { singleTodo: todoInput.val() };
//
//         $.ajax({
//             type: 'POST',
//             url: '/todo',
//             data: newTodo,
//             success: function (data) {
//                 // console.log('post data: ', data);
//                 location.reload();
//             }
//         });
//
//     });
//
//     $('ul#todo-list li').on('click', function (e) {
//
//         var deletedItem = { toDelete: $(e.target).text() }
//
//         $.ajax({
//             type: 'DELETE',
//             url: '/todo',
//             data: deletedItem,
//             success: function () {
//                 location.reload();
//             }
//         });
//
//     });
//
//
//
// });
