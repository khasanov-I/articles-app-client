import {renderWithTranslations} from 'shared/lib/renderWithTranslations';
import {Sidebar} from './Sidebar';
import {fireEvent, screen} from '@testing-library/react';

describe('Sidebar', () => {
    test('with only first param', () => {
        renderWithTranslations(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('test toggle', () => {
        renderWithTranslations(<Sidebar />);
        const toggleBtn = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        fireEvent.click(toggleBtn);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
