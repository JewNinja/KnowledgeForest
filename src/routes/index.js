import React from 'react'
import Navigator from 'react-native-easy-router'
import MainMenu from '../screens/MainMenu'
import GameModeSelection from '../screens/GameModeSelection'
import Game from '../screens/Game'

export const Router = () => <Navigator screens={{ MainMenu, GameModeSelection, Game }} initialStack='MainMenu' />