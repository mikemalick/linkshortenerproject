$input = [Console]::In.ReadToEnd()
$tool = ($input | ConvertFrom-Json).toolName

if ($tool -eq "create" -or $tool -eq "edit") {
    npx prettier --write .
}
