  #include <MsgBoxConstants.au3>
  #Include <GuiToolBar.au3>

  Local $sToolTip="z00316474";
  Local $hSysTray = ControlGetHandle('[Class:Shell_TrayWnd]', '', '[Class:ToolbarWindow32;Instance:1]')

    For $i = 1 To _GUICtrlToolbar_ButtonCount($hSystray)
      $sCurrent = _GUICtrlToolbar_GetButtonText($hSystray,$i)
      MsgBox($MB_SYSTEMMODAL, "Title", $sCurrent , 100)
      If $sCurrent == $sToolTip Then
        _GUICtrlToolbar_ClickButton($hSystray, $i, "left")
        ExitLoop
      EndIf
    Next
