// Journal_comp.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import JournalComp from '../journalComponents/Journal_comp';

describe('Journal_comp component', () => {
    // Sample props for testing
    const sampleProps = {
        title: 'Sample Title',
        date: '2023-11-14',
        desc: 'Sample Description',
        profileId: 'user123',
        id: 'journalId123',
        getJournalList: jest.fn(),
        img: 'https://example.com/image.jpg',
    };

    it('renders correctly', () => {
        const { getByText } = render(<JournalComp {...sampleProps} />);
        expect(getByText('Sample Title')).toBeDefined();
        expect(getByText('2023-11-14')).toBeDefined();
        expect(getByText('Sample Description')).toBeDefined();
    });

    it('renders correctly with image', () => {
        const { getByText, getByTestId } = render(<JournalComp {...sampleProps} />);
        expect(getByText('Sample Title')).toBeDefined();
        expect(getByText('2023-11-14')).toBeDefined();
        expect(getByText('Sample Description')).toBeDefined();
        expect(getByTestId('journal-image')).toBeDefined();
    });

    it('handles edit button click', () => {
        const { getByText } = render(<JournalComp {...sampleProps} />);
        fireEvent.press(getByText('Edit'));
        // Add assertions for the state changes or UI updates after clicking edit
    });

    it('handles save button click', () => {
        const { getByText } = render(<JournalComp {...sampleProps} />);
        fireEvent.press(getByText('Edit'));
        fireEvent.press(getByText('Save'));
        // Add assertions for the state changes or UI updates after clicking save
    });

    it('handles cancel button click', () => {
        const { getByText } = render(<JournalComp {...sampleProps} />);
        fireEvent.press(getByText('Edit'));
        fireEvent.press(getByText('Cancel'));
        // Add assertions for the state changes or UI updates after clicking cancel
    });

    it('handles delete button click', () => {
        const { getByText } = render(<JournalComp {...sampleProps} />);
        fireEvent.press(getByText('Delete'));
        // Add assertions for the state changes or UI updates after clicking delete
    });
});
