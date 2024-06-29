if ($env:OPVM_HOME) {
    $scriptPath = Join-Path -Path $env:OPVM_HOME -ChildPath "src\index.js"
    node $scriptPath $args
} else {
    Write-Host "`"OPVM_HOME`" has not been set"
}
