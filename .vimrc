func! s:refresh_win()
  pythonx << PY
import win32gui, win32con
# for Firefox
hwnd = win32gui.FindWindowEx(0, 0, "MozillaWindowClass", None)
win32gui.SendMessage(hwnd, win32con.WM_KEYDOWN, win32con.VK_F5, 0)
PY
endfunc

func! s:refresh_x11()
  let cur = execute('!xdotool getwindowfocus')
  let wid = execute('!xdotool search --onlyvisible --class google-chrome | sort -n | head -1')
  execute('!xdotool windowactivate '.wid)
  !xdotool key 'F5'
  execute('!xdotool windowactivate '.cur)
endfunc

func! s:refresh()
  if has('win32')
    call s:refresh_win()
  elseif has('unix')
    call s:refresh_x11()
  endif
endfunc

autocmd BufWritePost,FileWritePost * call s:refresh()
