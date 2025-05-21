import UserPanel from "@/components/nav/UserPanel";
import MeinKonto from "@/components/user/MeinKonto";

const myAccount = () => {
    return (
        <div className="flex flex-col items-center justify-center ">
       <MeinKonto />
       <UserPanel />
        </div>
    );
    }
export default myAccount;