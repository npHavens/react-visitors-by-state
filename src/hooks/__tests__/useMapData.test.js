import { useMapData } from '../useMapData.js'
import { act, renderHook } from '@testing-library/react-hooks'
import axios from 'axios'

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [
    {
      "id": "ME",
      "name": "Maine",
      "visits": 86
    },
    {
      "id": "AR",
      "name": "Arkansas",
      "visits": 768
    },
    {
      "id": "SD",
      "name": "South Dakota",
      "visits": 911
    },
    {
      "id": "ME",
      "name": "Maine",
      "visits": 86
    },
  ]}))
}))

describe('useBlacklist', () => {
  beforeEach(() => {

  })

  describe('useEffect', () => {
    it('should fetchMapData on mount', async () => {
      const { waitForNextUpdate } = renderHook(() => useMapData('250-500'))
      await waitForNextUpdate()
      expect(axios.get).toBeCalledWith('/map')
    })

    xit('should remove duplicates', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useMapData('250-500'))
      await waitForNextUpdate()

      expect(result.current.mapData).toEqual([
        {
          "id": "ME",
          "name": "Maine",
          "visits": 86
        },
        {
          "id": "AR",
          "name": "Arkansas",
          "visits": 768
        },
        {
          "id": "SD",
          "name": "South Dakota",
          "visits": 911
        },
      ])
    })
  })
})
