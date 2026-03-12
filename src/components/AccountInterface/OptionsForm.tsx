import { useAuth0 } from "@auth0/auth0-react";
import { type ChangeEvent , useState } from "react";
import type { UserData } from "./types";
import {UpdateInfo} from "./OptionService";

export default function OptionsForm() {
    /*
        use auth0 to get user data and display it in the options form,
            - check if email and confirm email match before allowing to submit changes
            - handle delete account
            - handle change password
                will be and button to send email to change password.
            

    */
    const { user, getAccessTokenSilently} = useAuth0();
    const [editMode, setEditMode] = useState(false);
    const [confirmEmail, setConfirmEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const [formData, setFormData] = useState<UserData>({
        name: user?.name || "" ,
        email: user?.email || "",
        id: user?.sub || "",
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        setErrorMsg(""); // Clear error message on input change
    };

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setFormData({
            name: user?.name || "",
            email: user?.email || "",
            id: user?.sub || "",
        });
        
        setConfirmEmail("");
        setErrorMsg("");
        setEditMode(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.email !== confirmEmail) {
            setErrorMsg("Emails do not match!"); 
            return;
        }
        if (user?.email_verified === false) {
            setErrorMsg("Please verify your email before making changes.");
            return;
        }

        const token = await getAccessTokenSilently();
        console.log(formData);
        try{
            await UpdateInfo(formData, token);
            setEditMode(false);
        } catch (error) {
            console.error("Error updating info:", error);
        }   
    }
    
    return (
        <div className="grid grid-flow-row-dense grid-cols-3">

            <div className="bg-red-500/0">
                <div
                    className="w-50 h-50 ml-7 mt-2 rounded-[10px] bg-cover bg-center shrink-0"
                    style={{ backgroundImage: `url(${user?.picture})` }}
                ></div>

                <div className="flex items-center justify-center">
                    <button className="w-40 rounded-xl bg-red-600 hover:bg-orange-500 text-white py-2 mt-2">
                        Delete Account
                    </button>
                </div>

            </div>

            <div className="bg-green-500/0 col-span-2">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center">
                        <p className="w-100 text-2xl">Name:</p>
                        <input 
                            type="text"
                            name="name"
                            onClick={() => setEditMode(true)}
                            onChange={handleInputChange}
                            value={formData.name} 
                            className={`
                                cursor-pointer
                                w-full 
                                rounded-md 
                                text-white 
                                px-3 
                                py-2 
                                mt-2
                                hover:bg-zinc-700
                                ${!editMode ? '' : 'bg-gray-800'}
                                `}
                                />
                    </div>
                    <div className="flex items-center">
                        <p className="w-100 text-2xl">Email:</p>
                        <input 
                            name="email"
                            type="Email" 
                            onClick={() => setEditMode(true)}
                            onChange={handleInputChange}
                            value={formData.email} 
                            className={`
                                cursor-pointer
                                w-full 
                                rounded-md 
                                text-white 
                                px-3 
                                py-2 
                                mt-2
                                hover:bg-zinc-700
                                ${!editMode ? '' : 'bg-gray-800'}
                            `}
                        />
                    </div>

                    {!editMode ? null : (
                        <div className="flex items-center">
                            <p className="w-100 text-2xl">Confirm Email:</p>
                            <input 
                                type="email"
                                name="confirmEmail"
                                value={confirmEmail}
                                onChange={(e) => {
                                    setConfirmEmail(e.target.value);
                                    setErrorMsg("");
                                }}
                                className="cursor-pointer w-full rounded-md bg-gray-800 text-white px-3 py-2 mt-2"
                            />
                        </div>
                    ) }

                    {errorMsg && (
                        <div className="w-100 text-2xl">
                            <p className="text-red-500 text-sm mt-1 ml-[100px] font-bold">
                                {errorMsg}
                            </p>
                        </div>
                    )}

                    <div className="flex items-center gap-9">
                        <button 
                            onClick={(e) => {e.preventDefault(); return;}}
                            className="w-50 rounded-md bg-blue-600 hover:bg-blue-500 text-white py-2 mt-2"
                        >
                            Change Password
                        </button>

                        {user?.email_verified ? (
                            <p className={`text-green-400`}>Email Verified: Yes</p>
                        ) : (
                            <p className={`text-red-400`}>Email Verified: No</p>
                        )}
                    </div>

                    {!editMode ? null : (
                        <div className="flex items-center justify-center gap-3">
                            <button 
                                type="submit"
                                className="w-30 rounded-xl bg-lime-600 hover:bg-lime-500 text-white py-2 mt-7">
                                Save
                            </button>
                            <button 
                                onClick={handleCancel}
                                className="w-30 rounded-xl bg-gray-800 hover:bg-gray-700 text-blue-500 py-2 mt-7">
                                Cancel
                            </button>
                        </div>
                    ) }
                </form>
            </div>

            <div className="bg-blue-600/0 col-span-3 mt-10 h-full">
                <p className="text-2xl text-center">Your Current tokens:</p>
            </div>
        </div>
    );
}