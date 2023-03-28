//CSS
import './ListaDeItens.css'

//REACT Hooks
import React, { useState, useEffect } from 'react';


function ListaDeItens(props) {
    const [listaDeItens, setListaDeItens] = useState([]);
    const [novoItem, setNovoItem] = useState('');
    const [exibirMensagem, setExibirMensagem] = useState(false);
    const [custo, setCusto] = useState(0);

    useEffect(() => {
        const listaSalva = localStorage.getItem('listaDeItens');
        console.log(listaSalva)
        if (listaSalva) {
            setListaDeItens(JSON.parse(listaSalva));
        }
    }, []);

    const handleRemoverItem = (itemId) => {
        const itemRemovido = listaDeItens.find((item) => item.id === itemId);
        const novaListaDeItens = listaDeItens.filter(item => item.id !== itemId);
        setCusto(prevState => prevState - itemRemovido.price);
        setListaDeItens(novaListaDeItens);
        localStorage.setItem('listaDeItens', JSON.stringify(novaListaDeItens));
    };

    const handleAdicionarItem = () => {
        if (novoItem.length < 8 || novoItem.length > 64) {
            alert('Por favor, digite um nome de produto entre 8 e 64 caracteres.');
        } else {
            const novoId = listaDeItens.length + 1;
            const novoItemDaLista = { id: novoId, name: novoItem, price: 0.00, checked: false };
            localStorage.setItem('listaDeItens', JSON.stringify([...listaDeItens, novoItemDaLista]));
            setCusto(prevState => novoItemDaLista.price + prevState);
            setListaDeItens([...listaDeItens, novoItemDaLista]);
            setNovoItem('');
            setExibirMensagem(true);
            setTimeout(() => {
                setExibirMensagem(false);
            }, 3000);
        }
    };

    const handleCheckboxChange = (itemId) => {
        const itemAlterado = listaDeItens.find((item) => item.id === itemId);
        itemAlterado.checked = !itemAlterado.checked;
        if (itemAlterado.checked) {
            const novoPreco = prompt("Digite o preço do produto:");
            itemAlterado.price = parseFloat(novoPreco);
            setCusto(prevState => prevState + itemAlterado.price);
        } else {
            setCusto(prevState => prevState - itemAlterado.price);
            itemAlterado.price = 0;
        }
        setListaDeItens([...listaDeItens]);
    };

    return (
        <div className='ListaDeItens'>
            <h3>Inserir item na lista:</h3>
            <div className='AddItem'>
                <input className='inputAddItem' type="text" placeholder='Inserir um novo item' value={novoItem} required minlength="8" maxlength="64" onChange={(event) => setNovoItem(event.target.value)} />
                <button className='buttomAddItem' onClick={handleAdicionarItem}>Inserir</button>
                {exibirMensagem && (
                    <div className='gif'>
                        <img src="src\Components\Assets\add-to-cart-shopping.gif" alt="Item adicionado com sucesso" />
                    </div>
                )}
            </div>
            <ul className='List'>
                {listaDeItens.map((item) => (
                    <li className='itemList' key={item.id}>
                        <input className='checkbox' type='checkbox' onChange={() => handleCheckboxChange(item.id)} checked={item.checked} />
                        {item.price > 0 && (
                            <span className="itemPrice"> - R$ {item.price.toFixed(2)}</span>
                        )}
                        {item.name}
                        <button className='buttomDelItem' onClick={() => handleRemoverItem(item.id)}>Remover</button>
                    </li>
                ))}
            </ul>
            <h3>Total de compras: R$ {custo.toFixed(2)}</h3>
        </div>
    );
}

export default ListaDeItens;