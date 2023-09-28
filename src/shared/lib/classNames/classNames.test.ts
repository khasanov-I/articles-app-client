import {classNames} from './classNames';

describe('classNames test', () => {
    test('with one param', () => {
        expect(classNames('someClass', {}, [])).toBe('someClass');
    });

    test('with mods', () => {
        expect(classNames('someClass', {mod: true}, [])).toBe('someClass mod');
    });

    test('with mods and additionals', () => {
        expect(classNames('someClass', {mod: true}, ['adds'])).toBe('someClass mod adds');
    });
});
