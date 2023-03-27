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
    margin: 1rem 1.5rem 1rem 1.5rem; 
    margin-right: auto;
    display: flex;
    div{
        min-width: 2rem;
        position: relative;
    }
  
    input{
        width: 200%;

        border: none;
        background: #f7c281;
        font-size: 1.2rem;
        color: #292421;
        padding: 1rem 2.5rem;
        border-radius: 1rem;
        outline: none;

        ::placeholder {
            color: #564F48;
          
          }
    }
    .search-icon{
        color: #564F48;
        position: absolute;
        top: 1.2rem;
        left: 1rem;    
    }
`;
export default Search;
