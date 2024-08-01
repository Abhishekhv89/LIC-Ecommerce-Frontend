export interface Props{
    onSearch:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    value:string;
    placeholder:string;
}