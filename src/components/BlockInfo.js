import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import moment from 'moment';

function BlockInfo(alchemy) {
    const { blockNum } = useParams();
    const [block, setBlock] = useState(null);

    useEffect(() => {
        async function getData(blockNum) {
            const block = await alchemy.alchemy.core.getBlock(parseInt(blockNum));
            setBlock(block);
        }
        getData(blockNum);
    }, [alchemy.alchemy.core, blockNum])

    if (!block) {
        return <div></div>
    }

    return (
        <div className="flex flex-col">
            <div className="text-sm">
                <p className="text-current font-light m-4"><b className="font-medium">Hash          : </b>{block.hash}</p>
                <p className="text-current font-light m-4"><b className="font-medium">Parent Hash   : </b>{block.parentHash}</p>
                <p className="text-current font-light m-4"><b className="font-medium">Block Number  : </b>{block.number}</p>
                <p className="text-current font-light m-4"><b className="font-medium">Nonce         : </b>{block.nonce}</p>
                <p className="text-current font-light m-4"><b className="font-medium">Timestamp     : </b>{moment(block.timestamp * 1000).utc().format('DD-MMM-YYYY hh:mm:ss A [UTC]')}</p>
                <p className="text-current font-light m-4"><b className="font-medium">Difficulty    : </b>{block.difficulty}</p>
                <p className="text-current font-light m-4"><b className="font-medium">Gas Limit     : </b>{(block.gasLimit._hex).toString()}</p>
                <p className="text-current font-light m-4"><b className="font-medium">Gas Used      : </b>{(block.gasUsed._hex).toString()}</p>
                <p className="text-current font-light m-4"><b className="font-medium">Miner         : </b>{block.miner}</p>
                <p className="text-current font-light m-4"><b className="font-medium">Extra Data    : </b>{block.extraData}</p>
                <p className="text-current font-light m-4"><b className="font-medium">Extra Data    : </b>{block.extraData}</p>
                <p className="text-current font-light m-4"><b className="font-medium">Base fee      : </b>{(block.baseFeePerGas._hex).toString()}</p>
            </div>
        </div>
    )
}
export { BlockInfo };
