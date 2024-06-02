import React, { useState } from 'react';
import { ListHeaderProps } from 'src/type/app';
import { InputField } from 'src/atoms/Input/BaseInputField';

export const ListHeader: React.FC<ListHeaderProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(searchQuery); 
    };

    return (
        <header className="list-header">
            <form onSubmit={handleSearch}>
                <InputField
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </header>
    );
};
