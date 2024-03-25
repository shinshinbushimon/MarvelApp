import React from 'react';
import { CustomLink } from 'src/atoms/Link/BaseLink';

export const HomeHeader: React.FC = () => {
    return (
        <header className="home-header">
            <nav className="navigation">
                <ul>
                    <li><CustomLink to="/characters">Characters</CustomLink></li>
                    <li><CustomLink to="/comics">Comics</CustomLink></li>
                    <li><CustomLink to="/events">Events</CustomLink></li>
                    <li><CustomLink to="/creators">Creators</CustomLink></li>
                </ul>
            </nav>
        </header>
    );
};
