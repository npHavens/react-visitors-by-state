import React, { useEffect, useState } from 'react';
import axios from 'axios'

/**
 * Data fetching hook that processes selected states based on filter passed in
 * @param {string} filter the filter range for visitor count
 * @returns array of lowercase state names filtered by visitor count
 */
export const useMapData = (filter) => {
    const [mapData, setMapData] = useState()
    const [mapDataError, setMapDataError] = useState()
    const [selectedStates, setSelectedStates] = useState([])

    useEffect(() => {
        axios.get('/map').then(({ data }) => {
            setMapData(removeDuplicates(data))
        })
        .catch((error) => {
            console.log("ERROR FETCHING")
            setMapDataError(error)
        })
    }, [])

    useEffect(() => {
        if (mapData) {
            setSelectedStates(getStatesWithinFilterRange(mapData, filter))
        }
    }, [mapData])

    useEffect(() => {
        if (filter && mapData) {
            setSelectedStates(getStatesWithinFilterRange(mapData, filter))
        }
    }, [filter])

    const removeDuplicates = (list) => {
        const visited = {}
        return list.reduce((accum, curr) => {
            if (!visited[curr.id]) {
                accum.push(curr)
            }
            visited[curr.id] = true

            return accum
        }, [])
    }

    const getStatesWithinFilterRange = (states, filterRange) => {
        return states.reduce((accum, curr) => {
            let min, max

            if (filter === '1000+') {
                min = 1000
                max = Infinity
            } else {
                min = Number(filter.split('-')[0])
                max = Number(filter.split('-')[1])
            }

            if (curr.visits >= min && curr.visits <= max) {
                accum.push(curr.id.toLowerCase())
            }
            return accum
        }, [])
    }

    return {
        selectedStates,
        mapDataError
    }
}
