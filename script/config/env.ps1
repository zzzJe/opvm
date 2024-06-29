param (
    [string]$envVarValue
)

$envVarName = "OPVM_HOME"

if (-not $envVarValue) {
    Write-Host "Usage: .\env.ps1 -envVarValue <value>"
    exit 1
}

$env:OPVM_HOME = $envVarValue
[System.Environment]::SetEnvironmentVariable($envVarName, $envVarValue, [System.EnvironmentVariableTarget]::User)
$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH", [System.EnvironmentVariableTarget]::User)

if ($env:OPVM_HOME -eq $envVarValue) {
    Write-Host "`"$envVarName`" has been successfully set to `"$envVarValue`""
} else {
    Write-Host "Failed to set `"$envVarName`""
}
