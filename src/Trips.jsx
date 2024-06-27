import TripElement from "./Tripelement"
import Tripheading from "./Tripheading"
export default function Trips(){
    const trips = [
        {Date:'20/08/2023',Material:'chips',UnloadingPlace:'bengalore',Customer:'mannusammi',QtyTon:30,VechialNo:'TN O2 BY 9599',Price_Ton:'300',Totalamount:'27899'},
        {Date:'20/08/2023',Material:'chips',UnloadingPlace:'bengalore',Customer:'mannusammi',QtyTon:30,VechialNo:'TN O2 BY 9599',Price_Ton:'300',Totalamount:'27899'},
        {Date:'20/08/2023',Material:'chips',UnloadingPlace:'bengalore',Customer:'mannusammi',QtyTon:30,VechialNo:'TN O2 BY 9599',Price_Ton:'300',Totalamount:'27899'},
        {Date:'20/08/2023',Material:'chips',UnloadingPlace:'bengalore',Customer:'mannusammi',QtyTon:30,VechialNo:'TN O2 BY 9599',Price_Ton:'300',Totalamount:'27899'},
        {Date:'20/08/2023',Material:'chips',UnloadingPlace:'bengalore',Customer:'mannusammi',QtyTon:30,VechialNo:'TN O2 BY 9599',Price_Ton:'300',Totalamount:'27899'},
        {Date:'20/08/2023',Material:'chips',UnloadingPlace:'bengalore',Customer:'mannusammi',QtyTon:30,VechialNo:'TN O2 BY 9599',Price_Ton:'300',Totalamount:'27899'},
    ]
    return(
        <div>
            <Tripheading/>
             {trips.map((item)=>{
                return <TripElement data={item}/>
             })}
        </div>
    )
}