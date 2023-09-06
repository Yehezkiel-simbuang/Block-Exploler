import { Alchemy, Network } from 'alchemy-sdk';
import { Block } from '../src/components/Block';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';
import { BlockInfo } from './components/BlockInfo';
import { TxBlock } from './components/TxBlock';

const settings = {
  // process.env.REACT_APP_ALCHEMY_API_KEY,
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
	return (
		<div className='bg-slate-100 min-h-screen'>
			<div className='w-5/6 mx-auto pt-10'>
				<nav className='text-slate text-2xl font-bold text-center py-4'><Link to="/">Ethereum Block Exploler</Link></nav>
				<Switch>
					<Route exact path ="/">
						<Block alchemy={alchemy}></Block>
					</Route>
					<Route path="/block/:blockNum">
						<div className='inline lg:flex lg:flex-row gap-8 pt-10'>
							<div className='w-full h-1/2 lg:w-1/2 bg-white shadow-md rounded p-8 mb-4'>
								<BlockInfo alchemy={alchemy}></BlockInfo>
							</div>
							<div className='w-full lg:w-1/2 bg-white shadow-md rounded p-2 mb-4'>
								<TxBlock alchemy={alchemy}></TxBlock>
							</div>
						</div>
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default App;
