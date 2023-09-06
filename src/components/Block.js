import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Block(alchemy) {
    const [latestBlock, setLatestBlock] = useState(null);
    useEffect(() => {
        
        async function getData() {
            const tenBlock = [];
            const latestBlock = await alchemy.alchemy.core.getBlockNumber();
            for (let i = 0; i < 10; i++) {
                const blockNum = latestBlock - i;
                tenBlock.push(blockNum);
            }
            setLatestBlock(tenBlock);
        }
        getData();
    }, [alchemy.alchemy.core]);

    if (!latestBlock) {
        return <div className="text-center">Loading ... </div>
    }

    return (
        // <div className="m-4 p-4 w-80 md bg-white shadow-md">
        //     <div className="place-self-center">
        //         {latestBlock.map((item, index) => (
        //             <Link to={`/block/${item}`} className="px-2 cursor-pointer">
        //                 <div key={item} className="py-3 my-4 rounded-lg bg-slate-300 hover:bg-slate-200">
        //                     <p className="text-current text-center"><b>{item}</b></p>
        //                 </div>
        //             </Link>
        //         ))}
        //     </div>
        // </div>
        <div className="max-w-[500px] m-auto bg-white p-8 mt-10">
                <h4 className="text-center text-lg"><b>Latest 10 Block</b></h4>
            <div className="pt-8">
                {latestBlock.map((item, index) => (
                    <Link to={`/block/${item}`} className="px-2 cursor-pointer">
                        <div key={item} className="py-3 my-4 rounded-lg bg-slate-300 hover:bg-slate-200">
                            <p className="text-current text-center"><b>{item}</b></p>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    )
}

export { Block };
