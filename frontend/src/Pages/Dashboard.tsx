
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DarkButton } from "../components/buttons/DarkButton";
import { LinkButton } from "../components/buttons/LinkButton";

interface Zap {
    "id": string,
    "triggerId": string,
    "userId": number,
    "actions": {
        "id": string,
        "zapId": string,
        "actionId": string,
        "sortingOrder": number,
        "type": {
            "id": string,
            "name": string
            "image": string
        }
    }[],
    "trigger": {
        "id": string,
        "zapId": string,
        "triggerId": string,
        "type": {
            "id": string,
            "name": string,
            "image": string
        }
    }
}

function useZaps() {
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/zap`, {
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-type": "application/json"
            }
        })
            .then(res => {
                setZaps(res.data.zaps);
                setLoading(false)
            })
    }, []);

    return {
        loading, zaps
    }
}

export const Dashboard = () => {
    const { loading, zaps } = useZaps();
    const router = useNavigate();

    return <div className="flex-col justify-center ">

        <div className="flex justify-center pt-8">
            <div className="max-w-screen-lg	 w-full">
                <div className="flex justify-between ">
                    <div className="text-2xl font-bold">
                        My Zaps
                    </div>
                    <DarkButton onClick={() => {
                        router("/zap/create");
                    }}>Create</DarkButton>
                </div>
            </div>
        </div>

        <div className="p-4 flex justify-center">
            {loading ?
                <div role="status" className="max-w-screen-lg w-full p-4 space-y-4  divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <span className="sr-only">Loading...</span>
                </div>
                : <div className="flex justify-center"> <ZapTable zaps={zaps} /> </div>}
        </div>
    </div>
}

function ZapTable({ zaps }: { zaps: Zap[] }) {

    return <div className="p-8 w-full">
        <div className="flex justify-between px-4">
            <div className="flex justify-betweenp" >
                <div className="pr-48">Name</div>
                <div >ID</div>
            </div>
            <div >Webhook URL</div>
        </div>
        {zaps.map(z => <div className=" flex justify-center border-b border-t px-4">
            <div className="flex pr-4"><img src={z.trigger.type.image} className="w-[30px] h-[30px]" /> {z.actions.map(x => <img src={x.type.image} className="w-[30px] h-[30px]" />)}</div>
            <div className="flex pr-4">{z.id}</div>
            <div >{`${import.meta.env.VITE_HOOKS_URL}/hooks/catch/1/${z.id}`}</div>
        </div>)}
    </div>
}