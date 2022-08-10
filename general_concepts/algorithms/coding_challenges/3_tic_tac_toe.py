"""
Code Warriors' Challenge 2022
Challenge #03

Task:
If we were to set up a Tic-Tac-Toe game, we would want to know whether the board's current state is solved, wouldn't we? Our goal is to create a function that will check that for us!
Assume that the board comes in the form of a 3x3 array, where the value is 0 if a spot is empty, 1 if it is an "X", or 2 if it is an "O", like so:
    [[0, 0, 1],
    [0, 1, 2],
    [2, 1, 0]]

We want our function to return:
   -1 --> if the board is not yet finished AND no one has won yet (there are empty spots),
    1 --> if "X" won,
    2 --> if "O" won,
    0 --> if it's a cat's game (i.e. a draw).

You may assume that the board passed in is valid in the context of a game of Tic-Tac-Toe.

Example:
board = [[0, 0, 1],
         [0, 1, 2],
         [2, 1, 0]] -> -1

board = [[2, 1, 2],
         [2, 1, 1],
         [1, 2, 1]] -> 0

Code form:
def is_solved(board):
    # TODO: Check if the board is solved!
"""


def is_solved(board):
    def has_player_won(player):
        size_of_board = len(board)
        winning_values = [player for _ in range(size_of_board)]
        has_full_row = any([winning_values == row for row in board])
        has_full_column = any([winning_values == [row[idx] for row in board] for idx in range(size_of_board)])
        has_diagonal_from_top_left = [board[i][i] for i in range(size_of_board)] == winning_values
        has_diagonal_from_top_right = [board[i][size_of_board - 1 - i] for i in range(size_of_board)] == winning_values
        return any([has_full_row, has_full_column, has_diagonal_from_top_left, has_diagonal_from_top_right])
    # =======================
    if has_player_won(1):
        return 1
    elif has_player_won(2):
        return 2
    else:
        is_over = not any([0 in row for row in board])
        return 0 if is_over else -1


testcases = [
    is_solved([[0, 0, 1],
               [0, 1, 2],
               [2, 1, 0]]) == -1,

    is_solved([[1, 0, 1],
               [0, 1, 2],
               [2, 1, 1]]) == 1,

    is_solved([[1, 0, 1],
               [0, 1, 2],
               [1, 1, 2]]) == 1,

    is_solved([[1, 0, 1],
               [1, 2, 2],
               [1, 2, 1]]) == 1,

    is_solved([[2, 0, 1],
               [1, 2, 2],
               [1, 1, 1]]) == 1,

    is_solved([[1, 0, 1],
               [1, 2, 2],
               [2, 2, 2]]) == 2,

    is_solved([[2, 0, 1],
               [0, 2, 2],
               [2, 1, 2]]) == 2,

    is_solved([[2, 1, 2],
               [2, 1, 1],
               [1, 2, 1]]) == 0
]
print(testcases)
