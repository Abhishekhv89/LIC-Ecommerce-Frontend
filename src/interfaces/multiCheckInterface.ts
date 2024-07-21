

export interface Props{
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    list:string[]
    title:string
     selectedItems: string[];
     onClear:()=>void;
}