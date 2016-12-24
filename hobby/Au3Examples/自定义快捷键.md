    #include <MsgBoxConstants.au3>
    #include <WinAPI.au3>
    HotKeySet("#c", "ShowMessage") ; Shift-Alt-d
    While 1
        Sleep(100)
    WEnd
    Func ShowMessage()
        If Not ProcessExists("Everything.exe") Then
            Run("F:\program\Everything\Everything.exe")
        Local $hWnd = WinWait("[CLASS:Everything]", "", 3)
        WinSetState($hWnd, "", @SW_MAXIMIZE)
      Else Then
        Local $iState = WinGetState("[CLASS:Everything]")
        If BitAND($iState, 16) Then
        EndIf
        EndIf
    EndFunc
