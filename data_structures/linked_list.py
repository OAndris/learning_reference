# Source: https://www.linkedin.com/learning/programming-foundations-algorithms/linked-lists-walkthrough

class Node(object):
    def __init__(self, val):
        self.val = val
        self.next = None
    
    def get_data(self):
        return self.val
    
    def set_data(self, val):
        self.val = val
    
    def get_next(self):
        return self.next
    
    def set_next(self, next):
        self.next = next


class LinkedList(object):
    def __init__(self, head=None):
        self.head = head
        self.count = 0
    
    def get_count(self):
        return self.count
    
    def insert(self, data):
        new_node = Node(data)
        new_node.set_next(self.head)
        self.head = new_node
        self.count += 1
    
    def find(self, val):
        item = self.head
        while (item != None):
            if item.get_data() == val:
                return item
            else:
                item = item.get_next()
        return None
    
    def delete_at(self, idx):
        # Find the node that is before the one we want to get rid of, and set it's next field to the node that is after the one we want to delete.
        if idx > self.count-1:
            return
        if idx == 0:
            self.head = self.head.get_next()
        else:
            temp_idx = 0
            node = self.head
            while temp_idx < idx-1:
                node = node.get_next()
                temp_idx += 1
            node.set_next(node.get_next().get_next())
            self.count -= 1


    def dump_list(self):
        tempnode = self.head
        while (tempnode != None):
            print('Node:', tempnode.get_data())
            tempnode = tempnode.get_next()


def main():
    # Create a linked list and insert some items:
    item_list = LinkedList()
    item_list.insert(38)
    item_list.insert(49)
    item_list.insert(13)
    item_list.insert(15)
    item_list.dump_list()

    # Exercise the list:
    print('\nItem count:', item_list.get_count())
    print('Finding item:', item_list.find(13))
    print('Finding item:', item_list.find(78))

    # Delete an item:
    item_list.delete_at(3)
    print('\nItem count:', item_list.get_count())
    print('Finding item:', item_list.find(38))
    item_list.dump_list()


if __name__ == '__main__':
    main()
