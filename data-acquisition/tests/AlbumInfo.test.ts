import { AlbumInfo } from '../src/AlbumInfo';

describe('testing index file', () => {
  test('empty string should result in zero', () => {
    expect(new AlbumInfo("Lenny Skinny", "Album", ["lenny skinny"],"placeholder",new Date("1/1/71"),1).numTracks).toBe(1);
  });
});