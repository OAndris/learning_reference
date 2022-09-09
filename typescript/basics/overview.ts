//===============
// Interface:
//===============
interface Props {
    foo: number;
    bar?: string;
    onClose: () => void;
} // the shape of an object can be enforced with an interface

interface Person {
    firstName: string;
    lastName: string;
    [key: string]: any; // this allows adding any additional key of tpye string with a value of type any
}

//===============
// Enum type:
//===============
enum Cheese {
    cheddar = 'cheddar',
    gouda = 'gouda',
}
const serveCheese = (cheeseType: Cheese, amount: number): void => {
    console.log(`Here it is! ${amount} servings of ${cheeseType} for you.`);
};
serveCheese(Cheese.gouda, 3);

//===============
// React Component:
//===============
// const Component:React.FC<Props> = (props) => { // NOTE: either this or the next line can be used
const Component = (props: Props) => {
    // NOTE: if a default value is provided, then explicit type definition is not required, because the default value automatically sets the type ("implicit type definition")
    // const [data, setData] = useState<string>('hi mom'); // e.g. here, <string> is not strictly required because the default value is already a string
    let name: string = 'Tyler';
    let age: number = 31;
    let married: boolean = true;
    const numericArray: number[] = []; // alternatively: Array<number>
    const people: Person[] = [];
    const calc = (width: number, height?: number = 1): [number, number] => {
        return [width, height];
    };
    const fetchData = (apiUrl: string): Promise<Person> => fetch(apiUrl).then((response) => response.json());
    return <>{props.children}</>;
};

//===============
// Custom types:
//===============
type MyCustomType = 'bold' | 'italic'; // union type
let font: MyCustomType;
font = 'something'; // compile time error
