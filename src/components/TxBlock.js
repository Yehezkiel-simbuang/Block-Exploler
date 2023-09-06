import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function TxBlock(alchemy) {
    const [tx, setTx] = useState(null);
    const { blockNum } = useParams();

    useEffect(() => {
        async function getData(blockNum) {
            const { transactions } = await alchemy.alchemy.core.getBlockWithTransactions(parseInt(blockNum));
            setTx(transactions.reverse());
        }
        getData(blockNum);
    }, [alchemy.alchemy.core, blockNum])

    if (!tx) {
        return <div></div>
    }

    return (
        <div className="mt-8 ml-4">
            <h4><b>Transaction list</b></h4>
            <div className="mt-8 max-h-96 overflow-y-auto">
                <table className="min-w-full">
                    <thead className="border-b">
                        <tr>
                            <th className="text-sm font-medium text-current p-2 pl-0 text-left">No</th>
                            <th className="text-sm font-medium text-current p-2 pl-0 text-left">Hash</th>
                            <th className="text-sm font-medium text-current p-2 pl-0 text-left">From</th>
                            <th className="text-sm font-medium text-current p-2 pl-0 text-left">To</th>
                            <th className="text-sm font-medium text-current p-2 pl-0 text-left">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tx.map((item, index) => (
                        <tr>
                            <td className="text-sm font-light text-current p-2 pl-0 whitespace-nowrap">{index + 1}</td>
                            <td className="text-sm font-light text-current p-2 pl-0 whitespace-nowrap">{(item.hash).slice(0, 6)}...{(item.hash).slice(-4)}</td>
                            <td className="text-sm font-light text-current p-2 pl-0 whitespace-nowrap">{(item.from).slice(0,6)}...{(item.from).slice(-4)}</td>
                            <td className="text-sm font-light current p-2 pl-0 whitespace-nowrap">{(item.to).slice(0, 6)}...{(item.to).slice(-4)}</td>
                            <td className="text-sm font-light text-current p-2 pl-0 whitespace-nowrap">{parseInt(item.value._hex, 16)/1000000000000000000} ETH</td>    
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export {TxBlock}