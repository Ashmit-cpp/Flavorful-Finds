import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Searched from '../pages/Searched';

function Search() {
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault(); // so that page does not reload on submission
        navigate('/searched/' + input)
    };
    return (
        <FormStyle onSubmit={submitHandler}>
            <div>
                <FaSearch className="search-icon" />
                <input  placeholder="Search 'Cake'" onChange={(e) => setInput(e.target.value)} 
                        type="text" value={input}   />             
            </div>
        </FormStyle>
    )
}

const FormStyle = styled.form`
    margin: 2.5rem 15rem;
    margin-right: 1rem;
    display: flex;
    div{
        min-width: 5rem;
        width: 100%;
        position: relative;
    }
  
    input{
        border: none;
        background: linear-gradient(to right, #e85733, #f53d0f);
        font-size: 1.2rem;
        color: #292421;
        
        padding: 1rem 2.5rem;
        border: none;
        border-radius: 1rem;
        outline: none;
        width: 100%;

        ::placeholder {
            color: #ffefe0;
          
          }
    }
    .search-icon{
        
        color: #ffefe0;
        position: absolute;
        top: 1.2rem;
        left: 1rem;    }
`;
export default Search;
