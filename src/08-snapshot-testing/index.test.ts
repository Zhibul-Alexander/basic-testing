// Uncomment the code below and write your tests
import { generateLinkedList, LinkedListNode } from "./index";

describe("generateLinkedList", () => {
  test("should generate linked list from values 1", () => {
    const elements = [1, 2, 3, 4, 5];
    const expectedLinkedList: LinkedListNode<number> = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: {
              value: 5,
              next: null
            }
          }
        }
      }
    };

    expect(generateLinkedList(elements)).toStrictEqual(expectedLinkedList);
  });

  test("should generate linked list from values 2", () => {
    const elements = [5, 4, 3, 2, 1];

    expect(generateLinkedList(elements)).toMatchSnapshot();
  });
});
